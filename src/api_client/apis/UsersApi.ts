import * as runtime from "../runtime";

export interface ApiEndpointsUsersSignInRequest {
    username: string;
    password: string;
    // UserSignInReq: UserSignInReq;
}

export interface UserSignInReq {
    username: string;
    password: string;
}

export interface UserSignInRes {
    status: string;
    token: string;
}

export class UsersApi extends runtime.BaseAPI {
    /**
     */
    async apiEndpointsUserSignInRaw(
        requestParameters: ApiEndpointsUsersSignInRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<UserSignInRes>> {
        // if (
        //     requestParameters.UserSignInReq === null ||
        //     requestParameters.UserSignInReq === undefined
        // ) {
        //     throw new runtime.RequiredError(
        //         "tasksCreateReq",
        //         "Required parameter requestParameters.username was null or undefined when calling apiEndpointsTasksCreate."
        //     );
        // }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters["Content-Type"] = "application/json";

        const response = await this.request(
            {
                path: `/api/v1/user`,
                method: "POST",
                headers: headerParameters,
                query: queryParameters,
                body: requestParameters.username,
            },
            initOverrides
        );

        return new runtime.JSONApiResponse(response);
    }

    /**
     */
    async apiEndpointsUserSignIn(
        requestParameters: ApiEndpointsUsersSignInRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<UserSignInRes> {
        const response = await this.apiEndpointsUserSignInRaw(requestParameters, initOverrides);
        return await response.value();
    }
}
