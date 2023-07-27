import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/common/layout";
import Head from "next/head";
import DetailSummary from "../../components/recipe/detailSummary";

export default function recipeDetail({idx = 0}) {
  
    return (
        <Layout>
            <DetailSummary idx={idx}/> 
        </Layout>
    );
}
