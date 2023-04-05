import { renderToBuffer } from "@react-pdf/renderer";
import { NextApiRequest, NextApiResponse } from "next";
import { ResolutionEntity, ResolutionEntityEnhanced } from "types";

import React from "react";

import { fetcherWithParams } from "@graphql/client";
import { getResolutionQuery } from "@graphql/queries/get-resolution.query";

import { getEnhancedResolutionMapper } from "@lib/resolutions/common";

import ResolutionPdf from "@components/resolutions/Pdf";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const graphQlResolutionData: any = await fetcherWithParams([getResolutionQuery, { id }]);
    const currentTimestamp = +new Date();
    const resolutionData: ResolutionEntityEnhanced = getEnhancedResolutionMapper(currentTimestamp)(
      graphQlResolutionData?.resolution as ResolutionEntity,
    );

    // @ts-ignore
    const pdf = await renderToBuffer(React.createElement(ResolutionPdf, { resolution: resolutionData }));

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="#${resolutionData.id}-${resolutionData.title.split(/\s+/).join("-").toLowerCase()}.pdf"`,
    );
    res.setHeader("Content-Type", "application/pdf");

    return res.send(pdf);
  } catch (error) {
    console.error(error);
    res.status(500).send("failed to generate resolution pdf, please try again later");
  }
};
