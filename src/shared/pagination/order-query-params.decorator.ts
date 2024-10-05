import {
  ExecutionContext,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CreateOrderParams, OrderRequestParams } from './order-query-params';

/**
 * Decorator intended for building a Order object based on the query string parameters
 */
export const Order = <T extends Record<string, string>>(type: T = {} as any) =>
  createParamDecorator<T>(
    (_: T, ctx: ExecutionContext): OrderRequestParams => {
      const { query } = ctx.switchToHttp().getRequest();
      const { order } = query;

      const orders = order ? (Array.isArray(order) ? order : [order]) : [];

      const params = orders.map((x) => {
        const parts = x.split(',');
        const field = parts[0];
        const direction =
          parts.length > 1 && (parts[1] === 'asc' || parts[1] === 'desc')
            ? parts[1]
            : 'asc';

        return { field, direction };
      });

      const allowedFields = Object.values(type);

      const fields =
        allowedFields.length !== 0
          ? params.filter((x) => allowedFields.includes(x.field))
          : params;

      const OrderParams = CreateOrderParams(type);
      return new OrderParams(fields);
    },
    [
      (target: any, key: any) => {
        applyDecorators(
          ApiQuery({
            name: 'order',
            description:
              Object.keys(type).length !== 0
                ? `Sort orders with format field,asc or field,desc. Allowed fields:<ul>${Object.values(
                    type,
                  )
                    .map((x) => `<li>${x}</li>`)
                    .join('')}</ul>`
                : 'Sort orders with format field,asc or field,desc',
            type: String,
            isArray: true,
            example:
              Object.keys(type).length !== 0
                ? Object.values(type).map(
                    (value, index) =>
                      `${value},${index % 2 === 0 ? 'asc' : 'desc'}`,
                  )
                : ['id,asc'],
            required: false,
          }),
        )(target, key, Object.getOwnPropertyDescriptor(target, key));
      },
    ],
  )(type);
