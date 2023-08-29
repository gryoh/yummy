/** @type {import('next').NextConfig} */
//todo 서버별로 변수 정의해서 destination 앞에 넣기

const isDevelopment = process.env.NODE_ENV !== 'production';

const nextConfig = {
  experimental: {
    appDir: true,
  },
  devtool: isDevelopment ? 'hidden-source-map' : 'inline-source-map',
  reactStrictMode: true,
  swcMinify: false, //minifying해주는 기능, 나중에 완전히 개발 완료되면 true로 바꿀 예정
  async rewrites() {
    return [
      {
        source: "/member/:path*",
        destination: isDevelopment ? "http://localhost:8080/member/:path*" : "http://gryoh.synology.me:8083/member/:path*",
      },
      {
        source: "/v1/:path*",
        destination: isDevelopment ? "http://localhost:8080/v1/:path*" : "http://gryoh.synology.me:8083/v1/:path*",
      },
    ];
  }
}

module.exports = nextConfig
