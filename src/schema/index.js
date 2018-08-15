import { schema } from 'normalizr';

const lessonSchema = new schema.Entity('lesson', {}, { idAttribute: 'id' });
const lessonListSchema = new schema.Array(lessonSchema);

export default {
  lessonListSchema
};
