// src/utils/ResponseConfig.ts
import { Response } from "express";

interface ResponseLinks {
  [key: string]: string;
}

interface ResponseOptions {
  statusCode: number;
  data?: any;
  message: string;
  error?: any;
  extraData?: any;
  paginate?: {
    totalData: number;
    totalPage: number;
    pageNo: number;
    pageSize: number;
    next?: string;
    previous?: string;
  };
}

interface CacheOptions {
  type: "public" | "private" | "no-cache" | "no-store";
  age: number;
}

export class ResponseConfig {
  private info: any;
  private links: ResponseLinks;
  private baseUrl: string;

  constructor(info: any, baseUrl: string) {
    this.info = info;
    this.links = this.generateLinks({}, baseUrl);
    this.baseUrl = baseUrl;
  }

  private generateLinks(links: ResponseLinks, baseUrl: string): ResponseLinks {
    const updatedLinks: ResponseLinks = {};
    for (const [key, link] of Object.entries(links)) {
      updatedLinks[key] = `${baseUrl}${link}`;
    }
    return updatedLinks;
  }

  private isError(statusCode: number): boolean {
    return statusCode >= 400 && statusCode <= 599;
  }

  private createResponse(res: Response, options: ResponseOptions): Response {
    const {
      statusCode,
      data = {},
      message,
      error,
      extraData,
      paginate,
    } = options;

    const responseData: any = {
      info: this.info,
      links: this.links,
      message,
      statusCode,
      ...data,
    };

    if (this.isError(statusCode)) {
      responseData.error = error || message;
    }

    if (extraData) {
      Object.assign(responseData, extraData);
    }

    if (paginate) {
      responseData.paginate = {
        totalData: paginate.totalData,
        totalPage: paginate.totalPage,
        pageNo: paginate.pageNo,
        pageSize: paginate.pageSize,
        // totalPage: Math.ceil(paginate.totalData / paginate.pageSize),
        next: paginate.next || this.baseUrl,
        previous: paginate.previous || this.baseUrl,
      };
    }

    return res.status(statusCode).json(responseData);
  }

  public setCacheControl(res: Response, type: string, age: number): void {
    res.setHeader("Cache-Control", `${type}, max-age=${age}`);
  }

  // public setRefreshToken(res: Response, refreshToken: string, age = 7) {
  //   res.cookie("refreshToken", refreshToken, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: "strict",
  //     maxAge: age * 24 * 60 * 60 * 1000, // 7 days
  //   });
  // }

  public setRefreshToken(res: Response, refreshToken: string | null, age = 7) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only secure in production
      sameSite: "lax", // More flexible than strict
      maxAge: age * 24 * 60 * 60 * 1000,
      path: "/", // Accessible across all routes
      domain:
        process.env.NODE_ENV === "production" ? ".yourdomain.com" : undefined,
    });
  }

  public ER200(
    res: Response,
    data: any = {},
    message = "Retrieved successfully",
    cache?: CacheOptions
  ): Response {
    const response = this.createResponse(res, {
      statusCode: 200,
      data: { data },
      message,
    });

    if (cache) {
      this.setCacheControl(response, cache.type, cache.age);
    }

    return response;
  }

  public ER200Paginate(
    res: Response,
    data: any[],
    totalData: number,
    pageNo: number,
    pageSize: number,
    totalPage: number,
    message = "Retrieved successfully"
  ): Response {
    return this.createResponse(res, {
      statusCode: 200,
      data: { data },
      message,
      paginate: {
        totalData,
        totalPage,
        pageNo,
        pageSize,
      },
    });
  }

  public ER201(
    res: Response,
    data: any = {},
    message = "Created successfully"
  ): Response {
    return this.createResponse(res, {
      statusCode: 201,
      data: { data },
      message,
    });
  }

  public ER400(res: Response, message: string, error: any): Response {
    return this.createResponse(res, {
      statusCode: 400,
      message,
      error,
    });
  }

  public ER401(
    res: Response,
    message: string,
    error: any,
    data?: any
  ): Response {
    return this.createResponse(res, {
      statusCode: 401,
      data,
      message,
      error,
    });
  }

  public ER404(res: Response, message: string, error: any): Response {
    return this.createResponse(res, {
      statusCode: 404,
      message,
      error,
    });
  }

  public ER409(res: Response, message: string, error?: any): Response {
    return this.createResponse(res, {
      statusCode: 409,
      message,
      error: error || message,
    });
  }

  public ER500(
    res: Response,
    error = "System error",
    extraData: any = {}
  ): Response {
    return this.createResponse(res, {
      statusCode: 500,
      message: error,
      error,
      extraData,
    });
  }
}
