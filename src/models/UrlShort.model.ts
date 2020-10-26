import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm'

@Entity()
export class UrlShort {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  generatedId: string;

  @Column()
  originalUrl: string;

  @Column()
  shortUrl: string;

}
