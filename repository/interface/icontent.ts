import { RowDataPacket } from "mysql2"

export interface Content extends RowDataPacket  {
  contentId?: string
  content: string
}