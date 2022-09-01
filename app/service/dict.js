'use strict'

const BaseService = require('./base')

class DictService extends BaseService {

// 文章tag
  // 新增tags dict
  async addTags(data) {
    const {
      ctx,
      app
    } = this;
    console.log('add dict', data);
    try {
      let addTagsInfo = await app.mysql.query(
        `INSERT INTO dictParam(tagsName) VALUES
        (?)`,
        [data.dictName]);
      if (addTagsInfo) {
        return '添加成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '添加失败');
    }
  }
  // 获取 tags dict
  async getTags() {
    const {
      ctx,
      app
    } = this;
    try {
      const rows = await app.mysql.query(`SELECT tagsName as dictName FROM dictParam WHERE tagsName IS NOT NULL`);
      console.log(rows)
      if (rows) {
        return {
          rows
        };
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }
  // 删除 tags dict
  async delTags(data) {
    const {
      ctx,
      app
    } = this;
    try {
      const delTagsInfo = await app.mysql.query(`DELETE FROM dictParam WHERE tagsName = '${data.dictName}'`);
      if (delTagsInfo) {
        return '删除成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '删除失败');
    }
  }
  // 获取 author dict
  async getAuthors() {
      const {
        ctx,
        app
      } = this;
      try {
        const rows = await app.mysql.query(`SELECT DISTINCT author as dictLabel FROM article`);
        console.log(rows)
        if (rows) {
          return {
            rows
          };
        }
      } catch (err) {
        console.log(err);
        ctx.throw(500, '查询失败');
      }
  }

// 资源tag
  // 新增tags dict
  async addMaterialTags(data) {
    const {
      ctx,
      app
    } = this;
    console.log('add dict', data);
    console.log(data.tag, data.rank);
    try {
      let addTagsInfo = await app.mysql.query(
        `INSERT INTO dictParam(materialTag, materialRank) VALUES
        (?, ?)`,
        [data.tag, data.rank]);
      if (addTagsInfo) {
        return '添加成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '添加失败');
    }
  }
  // 获取 tags dict
  async getMaterialTags() {
    const {
      ctx,
      app
    } = this;
    try {
      const rows = await app.mysql.query(`SELECT materialTag as tag FROM dictParam WHERE materialTag IS NOT NULL ORDER BY materialRank `);
      console.log(rows)
      if (rows) {
        return {
          rows
        };
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }
  // 编辑 tags dict
  async editMaterialTags(data) {
    const {
      ctx,
      app
    } = this;
    console.log('editTagsInfo', data.newTag, data.tag)
    const conn = await app.mysql.beginTransaction();
    try {
      const editTagsInfo = await conn.query(
        `UPDATE dictParam SET materialTag=? WHERE materialTag=?`,[data.newTag, data.tag]);
      const editSubTagsInfo = await conn.query(
        `UPDATE material SET tag=? WHERE tag=?`, [data.newTag, data.tag]);
      if (editTagsInfo && editSubTagsInfo) {
        await conn.commit();
        return '编辑成功';
      }
    } catch (err) {
      await conn.rollback();
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }
  // 删除 tags dict
  async delMaterialTags(data) {
    const {
      ctx,
      app
    } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      const beforeTagList = await conn.query(`SELECT materialTag as tag, materialRank as rank FROM dictParam WHERE materialTag IS NOT NULL ORDER BY materialRank `);
      await beforeTagList.map(async (tag) => {
        if (tag.rank >= data.rank) {
          tag.rank = +tag.rank - 1;
        }
        await conn.query(
          `UPDATE dictParam SET materialRank=? WHERE materialTag= ?`, [tag.rank, tag.tag]);
      })
      await conn.query(`DELETE FROM dictParam WHERE materialTag = ?`, [data.tag]);
      await conn.commit();
      return '删除成功';
    } catch (err) {
      await conn.rollback();
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }
  // 新增subTags
  async addSubMaterialTags(data) {
    const {
      ctx,
      app
    } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      let rank = null;
      if (+data.status !== 0) {
        const resCount = await conn.query(`SELECT COUNT(*) as length FROM material WHERE tag=? AND status=1 `, [data.tag]);
        console.log('resCount', resCount);
        rank = resCount[0].length || 0;
      }
      await conn.query(
        `INSERT INTO material VALUES
        (? ,?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.id,
          rank,
          data.tag,
          data.title,
          data.introduction,
          data.url,
          data.status,
          data.author,
          data.created_at,
          data.updated_at,
        ]);
      await conn.commit();
      return '添加成功';
    } catch (err) {
      await conn.rollback();
      console.log(err);
      ctx.throw(500, '添加失败');
    }
  }
  // 获取 所有tags dict
  async getAllMaterialTags() {
    const {
      ctx,
      app
    } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      const data = await conn.query(
        `SELECT materialTag as tag FROM dictParam WHERE materialTag IS NOT NULL ORDER BY materialRank`);
      data.map(async (mainTag)=>{
        const where = `tag = '${mainTag.tag}'`
        const tagList = await conn.query(
          `SELECT * FROM material WHERE concat(${where}) ORDER BY rank, created_at `);
        console.log(tagList);
        mainTag.tagList = tagList;
      })
      console.log(data)
      await conn.commit();
      return data;
    } catch (err) {
      await conn.rollback();
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }
  // 通过id获取子素材信息
  async getMaterialById(data) {
    const {
      ctx,
      app
    } = this;
    console.log(data, data.id)
    try {
      const resData = await app.mysql.query(
        `SELECT * FROM material WHERE id = ?`, [data.id]);
      console.log(resData)
      return resData;
    } catch (err) {
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }
  // 编辑subTags
  async updateSubMaterialTags(data) {
    const {
      ctx,
      app
    } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      let rank = null;
      if (+data.status === 1 && data.rank === null) {
        const resCount = await conn.query(`SELECT COUNT(*) as length FROM material WHERE tag=? AND status=1 `, [data.tag]);
        console.log('resCount', resCount);
        rank = resCount[0].length || 0;
      } else if (+data.status === 0 && data.rank !== null) {
        rank = null;
        const beforeTagList = await conn.query(`SELECT rank, id FROM material WHERE tag=? AND status=1  ORDER BY rank `,[data.tag]);
        console.log('beforeTagList', beforeTagList);
        await beforeTagList.map(async (tag) => {
          console.log(tag, tag.rank, data.rank);
          if (tag.rank >= data.rank) {
            tag.rank = +tag.rank - 1;
          }
          await conn.query(
            `UPDATE material SET rank=? WHERE id= ?`, [tag.rank, tag.id]);
        })
      }
      await conn.query(`UPDATE material SET tag=?, title=?, introduction=?, url=?, status=?, author=?, updated_at=?, rank=? WHERE id= ?`,
      [data.tag,
        data.title,
        data.introduction,
        data.url,
        data.status,
        data.author,
        data.updated_at,
        rank,
        data.id,
      ]);
      await conn.commit();
      return '编辑成功';
    } catch (err) {
      await conn.rollback();
      console.log(err);
      ctx.throw(500, '添加失败');
    }
  }
  // 删除subTags
  async delSubMaterial(data) {
    const {
      ctx,
      app
    } = this;
    try {
      const delTagsInfo = await app.mysql.query(`DELETE FROM material WHERE id = ?`, [data.id]);
      if (delTagsInfo) {
        return '删除成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '删除失败');
    }
  }

  // tags 排序
  // 查询tags排序
  async getMaterialTagsRank(data) {
    const {
      ctx,
      app
    } = this;
    try {
      const rows = await app.mysql.query(`SELECT materialTag as tag, materialRank as rank FROM dictParam WHERE materialTag IS NOT NULL ORDER BY materialRank `);
      console.log(rows)
      if (rows) {
        return {
          rows
        };
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }
  // 修改tags排序
  async changeMaterialTags(data) {
    const {
      ctx,
      app
    } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      data.tagList.map(async (tag)=>{
        await conn.query(
          `UPDATE dictParam SET materialRank=? WHERE materialTag= ?`, [tag.rank, tag.tag]);
      })
      await conn.commit();
      return '更新成功';
    } catch (err) {
      await conn.rollback();
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }
  // 查询subTags排序
  async getSubMaterialTagsRank(data) {
    const {
      ctx,
      app
    } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      const confirm = await app.mysql.query(`SELECT rank, tag, id FROM material WHERE id=?`, [data.id]);
      const tagList = await app.mysql.query(`SELECT rank, title, id FROM material WHERE tag=? AND status=1 ORDER BY rank `, [confirm[0].tag]);
      await conn.commit();
      return {
        confirm: confirm[0],
        tagList
      };
    } catch (err) {
      await conn.rollback();
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }
  // 修改subTags排序
  async changeSubMaterialTags(data) {
    const {
      ctx,
      app
    } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      data.tagList.map(async (tag)=>{
        await conn.query(
          `UPDATE material SET rank=? WHERE id= ?`, [tag.rank, tag.id]);
      })
      await conn.commit();
      return '更新成功';
    } catch (err) {
      await conn.rollback();
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }

}

module.exports = DictService
