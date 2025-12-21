import { BaseRequest, BaseResponse } from "@/apis/base";

export interface ISignInRequest extends BaseRequest {
  body: {
    email: string;
    password: string;
  };
//   params: {
//     provider: "email";
//   };
}

export type ISignInResponse = BaseResponse<{
  accessToken: string;
  refreshToken: string;
}>;

export interface ISignUpRequest extends BaseRequest {
  body: {
    name: string
    email: string;
    password: string;
  };
}

export type ISignUpResponse = BaseResponse<{
  accessToken: string;
  refreshToken: string;
}>;


export interface IUpdateProfileRequest extends BaseRequest {
  body: {
    name: string;
    avatarUrl: string;
  };
}