import { BaseResponse } from "@/apis/base";
import { VnoCrudApiClient } from "./crud";
import {
  ISignInRequest,
  ISignInResponse,
  ISignUpRequest,
  ISignUpResponse,
} from "../interfaces";
import { IUser } from "../interfaces/user";

export class AuthApiClient extends VnoCrudApiClient {
  constructor() {
    super({ resource: "auth" });
  }

  signIn(request: ISignInRequest): Promise<ISignInResponse> {
    return this.client.post("/login", request.body, {
      params: request.params,
    });
  }

  signUp(request: ISignUpRequest): Promise<ISignUpResponse> {
    return this.client.post("/register", request.body, {
      params: request.params,
    });
  }

  me(): Promise<BaseResponse<IUser>> {
    return this.client.get("/me");
  }
}
