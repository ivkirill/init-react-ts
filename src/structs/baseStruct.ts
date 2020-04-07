import propTypes from 'prop-types';
import { Dictionary, StructPropTypes } from 'interfaces';

export default class BaseStruct {
  static propTypes: StructPropTypes = {};
  static objectTypes: Dictionary<typeof BaseStruct> = {};

  /**
   * Returns struct instance within specified props.
   * By default creates new instance, but can be overwritten
   *
   * @param {Dictionary} props. Props to create struct with
   * @returns {T}
   */
  static getInstance<T extends BaseStruct>(this: { new(): T } & typeof BaseStruct, props: T ): T | Dictionary {
    return this.createInstance(props);
  }

   /**
   * Creates an array of instances
   *
   * @param {Dictionary[]} propsArray. An array of props to create each instance
   * @returns {T[]}
   */
  static getInstanceMap(propsArray: Dictionary[]): BaseStruct[] {
    return propsArray.map(props => this.getInstance(props));
  }

  /*
   * Creates struct new instance, with props types validation
   *
   * @static
   * @param {APIResponseModel} props. Props to create struct with
   * @returns {BaseStruct}
   */
  static createInstance<T extends BaseStruct>(this: { new(): T } & typeof BaseStruct, props: T): T {
    // Create new instance of struct, after that assign each property to that instance.
    // Assigning can not be done in class constructor's, since when super constructor is being
    // executed, no derived properties are accessible yet
    const instance = new this();

    // Getting default props for prop validation.
    // Instead of defining another static defaultProps property - find all instance's properties,
    // that have names, specified in propTypes - if that prop contains value - it's default value.
    const defaultProps: Dictionary<string> = {};
    const instanceValues = Object.create(instance);

    Object.getOwnPropertyNames(instance).forEach(propName => {
      if (this.propTypes[propName] !== undefined) {
        defaultProps[propName] = instanceValues[propName];
      }
    });

    // checkPropUnion function is commented because there are some unions,
    // like Company_relation that is not required. For this reason checkPropUnion
    // on validating company in runtime fails.
    // || this.checkPropUnion(props);
    const error: Error | null = this.checkPropTypes({ ...defaultProps, ...props }) || null;

    if (error !== null) {
      throw error;
    }

    Object.keys(props).map((propName: string) => {
      if (this.propTypes[propName] === undefined) {
        console.warn(`${this.name} does not have property ${propName}`);
      }

      Object.defineProperty(instance, propName, {
        value: this.getPropertyValue(props, propName)
      });
    });

    return instance;
  }

  /**
   * Type validation of props.
   * Can't use PropTypes.checkPropTypes since it only logs warning and never returns error object
   * ( PropTypes.checkPropTypes(this.propTypes, props, 'prop') )
   *
   * @static
   * @param {APIResponseModel} props. Props to validate
   * @returns {(Error | null)}
   */
  static checkPropTypes(props: Dictionary<string>): Error | null {
    for (const propName in this.propTypes) {
      if (!this.propTypes.hasOwnProperty(propName)) {
        continue;
      }

      try {
        propTypes.checkPropTypes(this.propTypes, props, propName, this.name);
      }
      catch(e) {
        return e;
      }
    }

    return null;
  }

  /**
   * Returns value for specified propName, received from props,
   * considering _objectTypes
   *
   * @param {Dictionary} props Props dictionary, to get value from
   * @param {string} propName Prop's name, to get value of
   */
  static getPropertyValue(props: Dictionary, propName: string): any {
    /*
      Find linked class for value property, if its exists, create instance of class using props
    */
    const Struct = this.objectTypes[propName];

    if (props[propName] != null && Struct != null) {
      if (Array.isArray(props[propName])) {
        return Struct.getInstanceMap(props[propName]);
      }

      return Struct.getInstance(props[propName]);
    }

    return props[propName];
  }
}
