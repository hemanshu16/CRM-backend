

import { ResultSetHeader } from "mysql2"
import { connection } from "./db"
import { Content } from "./interface/icontent"

export class contentRepository {
  readAll(): Promise<Content[]> {
    return new Promise((resolve, reject) => {
      connection.query<Content[]>("SELECT * FROM content ORDER BY contentId", (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  }

  readById(contentId: string): Promise<Content | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<Content[]>(
        "SELECT * FROM content WHERE contentId = ?",
        [contentId],
        (err, res) => {
          if (err) reject(err)
          else resolve(res?.[0])
        }
      )
    })
  }

  create(content: Content): Promise<Content> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "INSERT INTO content (contentId, content) VALUES(?,?)",
        [content.contentId, content.content],
        (err, res) => {
          if (err) {reject(err)}
          else
           { 
             this.readById(content.contentId!)
              .then(content => resolve(content!))
              .catch(reject)}
        }
      )
    })
  }

  update(content: Content,contentId:string): Promise<Content | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "UPDATE content SET contentId = ?, content = ? WHERE contentId = ?",
        [content.contentId, content.content,contentId],
        (err, res) => {
          if (err) reject(err)
          else
            this.readById(content.contentId!)
              .then(resolve)
              .catch(reject)
        }
      )
    })
  }

  remove(content_id: string): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "DELETE FROM content WHERE contentId = ?",
        [content_id],
        (err, res) => {
          if (err) reject(err)
          else resolve(res.affectedRows)
        }
      )
    })
  }
}