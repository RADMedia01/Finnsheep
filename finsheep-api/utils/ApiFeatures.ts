import { Query } from 'mongoose';
import { ParsedQs } from 'qs';

interface QueryString {
    [key: string]: string | number | undefined;
    page?: string | number;
    sort?: string;
    limit?: string | number;
    fields?: string;
}
class APIFeatures<T> {
  public query: any;
  public queryString: ParsedQs;

  constructor(query: Query<T[], T>, queryString: ParsedQs) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(): this {
    const queryObj = { ...this.queryString } as { [key: string]: any };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    const parsedQuery = JSON.parse(queryStr);

    // Ensure numeric filters are working
    Object.keys(parsedQuery).forEach(key => {
        if (typeof parsedQuery[key] === 'object') {
            Object.keys(parsedQuery[key]).forEach(innerKey => {
                if (['$gte', '$gt', '$lte', '$lt'].includes(innerKey)) {
                    parsedQuery[key][innerKey] = Number(parsedQuery[key][innerKey]);
                }
            });
        }
    });

    this.query = this.query.find(parsedQuery);
    

    return this;
  }

  sort(): this {
    if (this.queryString.sort) {
      const sortBy = (this.queryString.sort as string).split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields(): this {
    if (this.queryString.fields) {
      const fields = (this.queryString.fields as string).split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate(): this {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
  public getQuery() {
    return this.query;
  }
}

export default APIFeatures;
