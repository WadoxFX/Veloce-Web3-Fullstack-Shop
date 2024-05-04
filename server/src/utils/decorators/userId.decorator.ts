import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export interface UserDecorator {
  id: string
}

export const UserId = createParamDecorator(
  async (_: unknown, ctx: ExecutionContext): Promise<string> => {
    const request = ctx.switchToHttp().getRequest()
    
    const user: Promise<UserDecorator> = await request.user
    return (await user).id
  },
)
