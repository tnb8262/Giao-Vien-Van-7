// Kiểu tối giản cho request/response của Vercel Functions (Node.js runtime),
// tránh phải cài thêm @vercel/node.
export type ApiRequest = {
  method?: string;
  body?: any;
};

export type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (data: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

export function allowPostOnly(req: ApiRequest, res: ApiResponse): boolean {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method Not Allowed' });
    return false;
  }
  return true;
}
