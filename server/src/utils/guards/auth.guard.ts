import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()

    const token = request.cookies.token || request.query.token
    if (!token) throw new UnauthorizedException('Token is missing')

    const validToken = await this.jwtService.verifyAsync(token)
    if (!validToken) throw new UnauthorizedException('Token is invalid')

    request['user'] = validToken
    
    return true
  }
}
