import ReactPropTypesSecret from 'prop-types/lib/ReactPropTypesSecret';
import { Dictionary, ModelProps, BaseStructClass } from 'interfaces';

export default class BaseStruct {
  /**
   * Name of current class.
   * IMPORTANT: must be re-defined in extended classes, due to lack of Reflection API in JS
   */
  protected static __class: string = 'BaseStruct';
  static propTypes: Dictionary = {};
  static objectTypes: Dictionary = {};

  /**
   * Returns struct instance within specified props.
   * By default creates new instance, but can be overwritten
   *
   * @param {ModelProps} props. Props to create struct with
   * @returns {BaseStruct}
   */
  static getInstance<T extends BaseStruct>(props: ModelProps): T {
    return this.createInstance(props);
  }

  /**
   * Creates an array of instances
   *
   * @param {ModelProps[]} propsArray. An array of props to create each instance
   * @returns {BaseStruct[]}
   */
  static getInstanceMap<T extends BaseStruct>(propsArray: ModelProps[]): T[] {
    return propsArray.map(props => this.getInstance(props));
  }

  /**
   * Creates struct new instance, with props types validation
   *
   * @static
   * @param {ModelProps} props. Props to create struct with
   * @returns {BaseStruct}
   */
  static createInstance<T extends BaseStruct>(props: ModelProps): T {
    // Create new instance of struct, after that assign each property to that instance.
    // Assigning can not be done in class constructor's, since when super constructor is being
    // executed, no derived properties are accessible yet
    const instance: Dictionary = new this();

    // Getting default props for prop validation.
    // Instead of defining another static defaultProps property - find all instance's properties,
    // that have names, specified in propTypes - if that prop contains value - it's default value.
    const defaultProps: Dictionary = {};
    Object.getOwnPropertyNames(instance).forEach((propName) => {
      if (this.propTypes[propName] !== undefined) {
        defaultProps[propName] = instance[propName];
      }
    });

    const error: Error | null = this.checkPropTypes({ ...defaultProps, ...props });

    if (error !== null) {
      throw error;
    }

    Object.keys(props).map((propName: string) => {
      if (this.propTypes[propName] === undefined) {
        // TODO: use external logger
        console.warn(`${this.__class} does not have property ${propName}`);
      }

      instance[propName] = this.getPropertyValue(props, propName);
    });

    return <T>instance;
  }

  /**
   * Type validation of props.
   * Can't use PropTypes.checkPropTypes since it only logs warning and never returns error object
   * ( PropTypes.checkPropTypes(this.propTypes, props, 'prop') )
   *
   * @static
   * @param {ModelProps} props. Props to validate
   * @returns {(Error | null)}
   */
  static checkPropTypes(props: ModelProps): Error | null {
    for (const propName in this.propTypes) {
      if (!this.propTypes.hasOwnProperty(propName)) {
        continue;
      }

      const error: Error | null = this.propTypes[propName](
        props,
        propName,
        this.__class,
        'prop',
        null,
        ReactPropTypesSecret, // Without this argument, function will not allow to call itself
      );

      if (error !== null) {
        return error;
      }
    }

    return null;
  }

  /**
   * Returns value for specified propName, received from props,
   * considering _objectTypes
   *
   * @param {ModelProps} props Props dictionary, to get value from
   * @param {string} propName Prop's name, to get value of
   */
  static getPropertyValue(props: ModelProps, propName: string): any {
    const StructClass: undefined | BaseStructClass = this.objectTypes[propName];

    if (props[propName] != null && StructClass != null) {
      if (Array.isArray(props[propName])) {
        return StructClass.getInstanceMap(props[propName]);
      }

      return StructClass.getInstance(props[propName]);
    }

    return props[propName];
  }
}
