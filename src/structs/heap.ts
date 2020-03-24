import { BaseModelClass, ModelId } from 'interfaces';
import BaseModel from './baseModel';

/**
 * Model Objects Heap.
 * Is intended to avoid model objects duplicates in memory
 */
export class Heap {
  /**
   * Storage object, where all models are kept
   *
   * @private
   * @type {BaseStructClass<Map<ModelId, BaseModel>>}
   */
  private storage: Map<BaseModelClass, Map<ModelId, BaseModel>> = new Map();

  /**
   * Using specified attributes, tries to find existing model in storage,
   * if non found - creates and saves in storage.
   *
   * @param {any} attributes. Model's, to find, attributes. Technically could be anything
   * @param {string} key. Cache key
   * @returns {BaseModel | null}
   */
  findOrCreateModel(attributes: any, ModelClass: BaseModelClass, key: string): BaseModel | any {
    let model: BaseModel | null = this.findStorageModel(attributes, ModelClass, key);

    if (model !== null) {
      return model;
    }

    // Try to create model from specified attributes - if not succeeded return specified attributes
    model = this.createModel(attributes, ModelClass, key);

    if (model !== null) {
      return model;
    }

    return attributes;
  }

  findOrCreateAll(objects: any[], ModelClass: BaseModelClass, key: string): (BaseModel | any)[] {
    const list: (BaseModel | any)[] = [];

    for (const attributes of objects) {
      const model = this.findOrCreateModel(attributes, ModelClass, key);

      list.push(model);
    }

    return list;
  }

  /**
   * Creates model from specified attributes. If succeeded - add model to storage, otherwise return null
   *
   * @param {any} attributes. Attributes of model to create
   * @param {string} key. Cache key
   * @returns {(BaseModel | null)}
   */
  createModel(attributes: any, ModelClass: BaseModelClass, key: string): BaseModel | null {
    const model = this.createModelInstance(attributes, ModelClass);

    if (model != null) {
      return this.addStorageModel(model, ModelClass, key);
    }

    return null;
  }

  findStorageModel(attributes: any, ModelClass: BaseModelClass, key: string = ''): BaseModel | null {
    if (attributes == null || attributes.id == null) {
      return null;
    }

    const { id } = attributes;
    const storageOfClass = this.storage.get(ModelClass);

    if (storageOfClass == null) {
      return null;
    }

    const uid = (key) ? `${id}${key}` : id;
    return storageOfClass.get(uid) || null;
  }

  addStorageModel(model: BaseModel, ModelClass: BaseModelClass, key: string = ''): BaseModel {
    if (!this.storage.has(ModelClass)) {
      this.storage.set(ModelClass, new Map());
    }

    const { id } = model;

    if (id != null) {
      const uid = (key) ? `${id}${key}` : id;
      this.storage.get(ModelClass)!.set(uid, model);
    }

    return model;
  }

  updateStorageModel(model: BaseModel, attributes: any, ModelClass: BaseModelClass): BaseModel {
    const updateModel = this.createModelInstance(attributes, ModelClass);

    if (updateModel == null) {
      return model;
    }

    // Can't just replace model object, since all values, that have link to the updated model,
    // will never get new updated model, they still will be pointing to the old object, which was replaced
    Object.assign(model, updateModel);

    return model;
  }

  createModelInstance(attributes: any, ModelClass: BaseModelClass): BaseModel | null {
    if (attributes == null) {
      return null;
    }

    return <BaseModel>ModelClass.createInstance(attributes);
  }
}

export default new Heap();
