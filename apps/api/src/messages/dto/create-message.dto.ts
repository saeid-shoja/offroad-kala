import { IsEnum, IsOptional, IsString, MinLength, ValidateIf } from 'class-validator';
import { MessageTarget, UserMessageType } from '../../prisma/generated/client';

export class CreateMessageDto {
  @IsString()
  @MinLength(2, { message: 'عنوان باید حداقل ۲ کاراکتر باشد' })
  title!: string;

  @IsString()
  @MinLength(2, { message: 'متن پیام باید حداقل ۲ کاراکتر باشد' })
  body!: string;

  @IsOptional()
  @IsEnum(UserMessageType, { message: 'نوع پیام معتبر نیست' })
  type?: UserMessageType;

  @IsEnum(MessageTarget, { message: 'مخاطب معتبر نیست' })
  target!: MessageTarget;

  @ValidateIf((dto: CreateMessageDto) => dto.target === 'USER')
  @IsString({ message: 'شناسه کاربر الزامی است' })
  userId?: string;
}
