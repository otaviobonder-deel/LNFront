import React from "react";
import { StyledComparision } from "./styles";
import { Container, Typography } from "@material-ui/core";
import ChartComparision from "../../components/chartComparision";
import { useTranslation } from "react-i18next";

export default function Comparision(props) {
    const { t } = useTranslation("chart");

    return (
        <StyledComparision>
            <Container maxWidth="lg" className="main">
                <div className="section">
                    <Typography align="center" variant="h4">
                        <span role="img" aria-label="Chart up">
                            📈
                        </span>{" "}
                        {t("How does bitcoin compare")}{" "}
                        <span role="img" aria-label="Chart up">
                            💰
                        </span>
                    </Typography>
                </div>
                <div className="section">
                    <Typography align="center">
                        {t("Here you can simulate how would")}{" "}
                        <span role="img" aria-label="the king">
                            👑
                        </span>{" "}
                        Bitcoin{" "}
                        <span role="img" aria-label="the king">
                            👑
                        </span>{" "}
                        {t("compare against others investments.")}
                    </Typography>
                </div>
                <div className="section">
                    <Typography align="center">
                        {t(
                            "Choose the date you would like to begin, the amount to invest and the periodicity of the investment. You can visualize the comparision of the investment against Bitcoin in the chart below."
                        )}
                    </Typography>
                </div>
                <div className="section">
                    <ChartComparision />
                </div>
            </Container>
        </StyledComparision>
    );
}
