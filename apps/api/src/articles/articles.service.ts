import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class ArticlesService {
  async create(createArticleDto: CreateArticleDto) {
    try {
      const articleRef = await admin
        .firestore()
        .collection('WIKI')
        .doc('articles')
        .collection('ARTICLES_DOCS')
        .doc();
      articleRef.set({
        ...createArticleDto,
        isExist: true,
        id: articleRef.id,
        createdAt: new Date().toISOString(),
        createdBy: createArticleDto.userId,
        upVotes: [],
        downVotes: [],
        following: [createArticleDto.userId],
        unfollowing: [],
        updatedBy: createArticleDto.userId,
        updatedAt: new Date().toISOString(),
      });
      return 'article created successfully';
    } catch (error) {
      throw error;
    }
  }

  async update(articleId: string, updateArticleDto: UpdateArticleDto) {
    const articleRef = await admin
      .firestore()
      .collection('WIKI')
      .doc('articles')
      .collection('ARTICLES_DOCS')
      .doc(articleId);
    let articleInfo;
    this._check_article_exists(articleId)
      .then((data) => {
        articleInfo = data;
        articleRef.set(
          {
            ...updateArticleDto,
            updatedBy: updateArticleDto.userId,
            updatedAt: new Date().toISOString(),
          },
          { merge: true },
        );
        return 'article updated successfully';
      })
      .catch((err) => {
        throw err;
      });
  }

  async findByCategory(categoryId: string) {
    return await admin
      .firestore()
      .collection('WIKI')
      .doc('articles')
      .collection('ARTICLES_DOCS')
      .where('categoryId', '==', categoryId)
      .where('isExist', '==', true)
      .get()
      .then((snap) => {
        if (snap.size < 1) throw new Error('no-article-exists');
        return snap.docs.map((doc) => doc.data());
      })
      .catch((err) => {
        throw err;
      });
  }

  async remove(articleId: string) {
    const articleRef = await admin
      .firestore()
      .collection('WIKI')
      .doc('articles')
      .collection('ARTICLES_DOCS')
      .doc(articleId);
    let articleInfo;
    return this._check_article_exists(articleId)
      .then((data) => {
        articleInfo = data;
        articleRef.update({ isExist: false });
        return 'article deleted successfully';
      })
      .catch((err) => {
        throw err;
      });
  }

  async _check_article_exists(articleId) {
    return await admin
      .firestore()
      .collection('WIKI')
      .doc('articles')
      .collection('ARTICLES_DOCS')
      .where('id', '==', articleId)
      .where('isExist', '==', true)
      .get()
      .then((snap) => {
        if (snap.size < 1) throw new Error('no-article-exists');
        return snap.docs[0].data();
      })
      .catch((err) => {
        throw err;
      });
  }
}
