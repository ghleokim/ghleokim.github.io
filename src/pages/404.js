import React from "react"

import Layout from "../layouts"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>잘못된 경로입니다 ! 돌아가주세요 <span role="img" aria-label="sad emoji">😕</span></h1>
    <a href="/">메인으로 돌아가기</a>
  </Layout>
)

export default NotFoundPage
