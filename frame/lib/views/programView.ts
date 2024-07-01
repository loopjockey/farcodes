import tags from "../html.ts";
const { div, span, img } = tags;

export const programView = (
    p: {
        programName: string;
        programDescription: string;
        referrerBonus: string;
        refereeBonus: string;
        programAvatarUrl: string;
    },
) => {
    const {
        programName,
        programDescription,
        programAvatarUrl,
        refereeBonus,
        referrerBonus,
    } = p;
    return div(
        {
            style: {
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background:
                    "linear-gradient(30deg, rgba(21,14,27,1) 60%, rgba(35,23,47,1) 100%)",
                color: "white",
                textAlign: "center",
                padding: "20px",
                border: "solid 4px #FF4F00",
            },
        },
        div(
            {
                style: {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: "800px",
                },
            },
            img({
                src: programAvatarUrl,
                width: "150",
                height: "150",
                style: {
                    marginRight: "20px",
                    borderRadius: "20px",
                },
            }),
            div(
                {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                    },
                },
                div({
                    style: {
                        display: "flex",
                        fontSize: "38px",
                        fontWeight: "bold",
                        color: "#FF4F00"
                    },
                }, programName),
                div(
                    {
                        style: {
                            display: "flex",
                            marginTop: 10,
                            fontSize: "25px",
                            maxWidth: "600px",
                        },
                    },
                    programDescription,
                ),
                div(
                    {
                        style: {
                            marginTop: 20,
                            fontSize: "30px",
                            fontWeight: "bold",
                            display: "flex",
                            color: "#000",
                            background: "#FF4F00",
                            padding: "5px",
                        },
                    },
                    `${refereeBonus} sign-up bonus • ${referrerBonus} referral reward`,
                ),
            ),
        ),
        div(
            {
                style: {
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold",
                    display: "flex",
                },
            },
            "Powered by ",
            span(
                { style: { color: "#FF4F00", marginLeft: "5px" } },
                "FAR.CODES",
            ),
        ),
    );
};
