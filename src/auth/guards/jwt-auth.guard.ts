import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../entities/auth.entity";

export const getUser = createParamDecorator(
     (_data, ctx: ExecutionContext): User => {
          const req = ctx.switchToHttp().getRequest();
          return req.user;
     }
);