import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class CategoryService {
  async create(createCategoryDto: CreateCategoryDto) {
    const categoryRef = await admin
      .firestore()
      .collection('WIKI')
      .doc('categories')
      .collection('CATEGORIES_DOCS')
      .doc();
    const metaRef = await admin
      .firestore()
      .collection('WIKI')
      .doc('categories');
    let metaInfo;
    categoryRef
      .create({
        ...createCategoryDto,
        isExist: true,
        createdAt: new Date().toISOString(),
        categoryId: categoryRef.id,
      })
      .then(() => {
        return metaRef.get();
      })
      .then((doc) => {
        metaInfo = doc.data();
        const types = {};
        doc.exists &&
          Object.entries(metaInfo.types).forEach(([key, value]) => {
            types[key] = value;
          });
        types[categoryRef.id] = createCategoryDto.name;
        const fieldValue = admin.firestore.FieldValue;
        metaRef.set(
          {
            count: fieldValue.increment(1),
            types,
          },
          { merge: true },
        );
        return 'Category created successfully';
      })
      .catch((err) => {
        throw err;
      });
  }

  async findAll() {
    try {
      const categoriesSnapshot = await admin
        .firestore()
        .collection('WIKI')
        .doc('categories')
        .collection('CATEGORIES_DOCS')
        .get();

      const categories = categoriesSnapshot.docs.map((doc) => ({
        categoryId: doc.id,
        ...doc.data(),
      }));

      return categories;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      const categoryDoc = await admin
        .firestore()
        .collection('WIKI')
        .doc('categories')
        .collection('CATEGORIES_DOCS')
        .doc(id)
        .get();

      if (!categoryDoc.exists) {
        return 'Category not found';
      }

      const category = {
        categoryId: categoryDoc.id,
        ...categoryDoc.data(),
      };

      return category;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryId = id;
    const updateData = updateCategoryDto;
    try {
      const categoryRef = admin
        .firestore()
        .collection('WIKI')
        .doc('categories')
        .collection('CATEGORIES_DOCS')
        .doc(categoryId);

      await categoryRef.update({
        ...updateData,
        updatedAt: new Date().toISOString(),
      });

      return 'Category updated successfully';
    } catch (error) {
      return 'Category not found';
      console.log(error);
    }
  }

  remove(id: string) {
    const categoryRef = admin
      .firestore()
      .collection('WIKI')
      .doc('categories')
      .collection('CATEGORIES_DOCS')
      .doc(id);
    const metaRef = admin.firestore().collection('WIKI').doc('categories');
    let categoryInfo, metaInfo;
    return categoryRef
      .get()
      .then((data) => {
        categoryInfo = data.data();
        if (!categoryInfo.isExist) {
          throw new Error('category-already-deleted');
        }
        return categoryRef.update({ isExist: false });
      })
      .then(() => {
        return metaRef.get();
      })
      .then((doc) => {
        metaInfo = doc.data();
        const types = {};
        const archived = { ...metaInfo.archived };
        Object.entries(metaInfo.types).forEach(([key, value]) => {
          if (key !== id) {
            types[key] = value;
          } else {
            archived[key] = value;
          }
        });
        return metaRef.set({
          count: Object.keys(types).length,
          types,
          archived,
        });
      })
      .then(() => {
        return admin
          .firestore()
          .collection('WIKI')
          .where('categoryId', '==', id)
          .where('isExist', '==', true)
          .get();
      })
      .then((snap) => {
        return snap.docs.map((doc) => doc.id);
      })
      .catch((err) => {
        throw err;
      });
  }
}
