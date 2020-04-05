import { BaseModelClass, Dictionary } from 'interfaces';
import { BaseModel } from 'structs';

/**
 * Model Objects Heap.
 * Is intended to avoid model objects duplicates in memory
 */
export class Heap {
  instance: Heap;
  exists: boolean;

  constructor() {
    if (this.exists) {
      return this.instance;
    }

    this.instance = this;
    this.exists = true;
  }

  /**
   * Storage object, where all models are kept
   *
   * @private
   * @type {BaseStructClass<Map<number, BaseModel>>}
   */
  private storage: Map<BaseModelClass, Map<number, BaseModel>> = new Map();

  /**
   * Using specified attributes, tries to find existing model in storage,
   * if non found - creates and saves in storage.
   *
   * @param {Dictionary} attributes. Model's, to find, attributes.
   * @returns {BaseModel | null}
   */
  findModel(attributes: Dictionary, ModelClass: BaseModelClass): BaseModel | Dictionary {
    let model: BaseModel | null = this.getModel(attributes, ModelClass);

    if (model !== null) {
      this.updateModel(model, attributes, ModelClass);

      return model;
    }

    // Try to create model from specified attributes - if not succeeded return specified attributes
    model = this.createModel(attributes, ModelClass);

    if (model !== null) {
      return model;
    }

    return attributes;
  }

  findAll(objects: Dictionary[], ModelClass: BaseModelClass): (BaseModel | Dictionary)[] {
    const list: (BaseModel | Dictionary)[] = [];

    for (const attributes of objects) {
      const model = this.findModel(attributes, ModelClass);

      list.push(model);
    }

    return list;
  }

  /**
   * Creates model from specified attributes. If succeeded - add model to storage, otherwise return null
   *
   * @param {Dictionary} attributes. Attributes of model to create
   * @returns {(BaseModel | null)}
   */
  createModel(attributes: Dictionary, ModelClass: BaseModelClass): BaseModel | null {
    const model = this.getInstance(attributes, ModelClass);

    if (model != null) {
      return this.addModel(model, ModelClass);
    }

    return null;
  }

  getModel(attributes: Dictionary, ModelClass: BaseModelClass): BaseModel | null {
    if (attributes == null || attributes.id == null) {
      return null;
    }

    const { id } = attributes;
    const storageOfClass = this.storage.get(ModelClass);

    if (storageOfClass == null) {
      return null;
    }

    return storageOfClass.get(id) || null;
  }

  addModel(model: BaseModel, ModelClass: BaseModelClass): BaseModel {
    const { id } = model;

    if (!this.storage.has(ModelClass)) {
      this.storage.set(ModelClass, new Map());
    }

    if (id != null) {
      this.storage.get(ModelClass)!.set(id as any, model);
    }

    return model;
  }

  updateModel(model: BaseModel, attributes: Dictionary, ModelClass: BaseModelClass): BaseModel {
    const update = this.getInstance(attributes, ModelClass);

    if (update == null) {
      return model;
    }

    if (Number(model.updated) < Number(update.updated)) {
      // Can't just replace model object, since all values, that have link to the updated model,
      // will never get new updated model, they still will be pointing to the old object, which was replaced
      Object.assign(model, update);
    }

    return model;
  }

  getInstance(attributes: Dictionary, ModelClass: BaseModelClass): BaseModel | null {
    if (attributes == null) {
      return null;
    }

    return <BaseModel>ModelClass.createInstance(attributes);
  }
}

const heap = new Heap()

export default heap;
