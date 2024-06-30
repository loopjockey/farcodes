import tags from "./html.ts";
const { div, svg, g, path } = tags;

export const baseView = () =>
    div(
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
            svg(
                {
                    xmlns: "http://www.w3.org/2000/svg",
                    version: "1.0",
                    width: "150",
                    height: "150",
                    viewBox: "0 0 300.000000 300.000000",
                    preserveAspectRatio: "xMidYMid meet",
                    style: {
                        marginRight: "20px",
                    },
                },
                g(
                    {
                        transform:
                            "translate(0.000000,300.000000) scale(0.100000,-0.100000)",
                        fill: "#000000",
                        stroke: "none",
                    },
                    path({
                        d: "M143 2979 c-49 -24 -109 -87 -129 -135 -21 -50 -21 -2638 0 -2688 21 -50 80 -111 131 -135 45 -21 46 -21 1357 -21 1304 0 1312 0 1354 21 49 23 110 86 130 135 12 28 14 242 14 1346 0 1304 0 1312 -21 1354 -23 49 -86 110 -135 130 -28 12 -242 14 -1346 14 -1311 0 -1313 0 -1355 -21z m579 -1021 c3 -172 6 -208 21 -236 51 -93 183 -95 239 -3 22 34 23 48 26 239 l3 203 42 -3 42 -3 3 -287 2 -288 -45 0 c-38 0 -45 3 -45 20 0 25 2 25 -55 -6 -88 -50 -210 -27 -270 51 -49 65 -55 101 -55 316 l0 199 44 0 45 0 3 -202z m533 99 c0 -53 1 -97 3 -97 1 0 22 10 45 22 58 31 156 31 214 0 108 -57 143 -196 77 -309 -62 -107 -217 -144 -307 -73 -32 25 -36 25 -30 0 5 -18 0 -20 -41 -20 l-46 0 0 291 0 290 43 -3 42 -3 0 -98z m718 -61 c69 -29 110 -91 123 -184 l7 -52 -172 0 c-189 0 -194 -2 -145 -60 62 -73 142 -78 216 -12 16 13 20 13 43 -2 31 -20 32 -36 2 -64 -35 -33 -91 -52 -154 -52 -159 1 -262 134 -219 282 18 63 73 122 132 143 50 18 126 19 167 1z m397 -31 c0 -45 0 -45 -34 -45 -22 0 -45 -9 -63 -24 -28 -24 -28 -24 -31 -170 l-3 -146 -45 0 -44 0 0 210 0 210 45 0 c39 0 45 -3 45 -22 0 -20 1 -20 18 -5 22 20 60 36 90 36 20 1 22 -4 22 -44z m-1330 -585 l0 -50 -150 0 -150 0 0 -70 0 -70 145 0 145 0 0 -50 0 -50 -145 0 -145 0 0 -70 0 -70 150 0 150 0 0 -50 0 -50 -202 2 -203 3 -3 288 -2 287 205 0 205 0 0 -50z m760 -40 l0 -60 60 0 60 0 0 -45 0 -45 -60 0 -60 0 0 -108 c0 -71 4 -112 12 -120 7 -7 34 -12 60 -12 l48 0 0 -50 0 -50 -57 0 c-32 0 -75 5 -96 11 -61 16 -71 43 -77 193 l-5 131 -37 3 c-38 3 -38 4 -38 48 l0 44 40 0 40 0 0 60 0 60 55 0 55 0 0 -60z m468 -69 c43 -22 82 -71 82 -103 0 -30 -84 -25 -122 7 -49 42 -106 45 -143 9 -15 -15 -15 -18 0 -34 9 -10 39 -23 66 -29 27 -6 72 -16 100 -22 96 -21 139 -88 104 -163 -33 -69 -136 -106 -241 -87 -72 14 -118 44 -144 96 l-20 40 51 3 c45 3 56 -1 79 -23 46 -44 148 -47 170 -5 15 28 -17 46 -112 64 -42 8 -90 22 -106 30 -109 56 -89 186 35 232 52 20 147 12 201 -15z m-860 -1 c34 -16 42 -16 42 -5 0 11 14 15 55 15 l55 0 0 -215 0 -215 -51 0 c-42 0 -52 3 -56 20 -5 19 -6 19 -47 -2 -55 -28 -137 -28 -192 0 -116 59 -160 189 -104 302 51 101 191 149 298 100z",
                    }),
                    path({
                        d: "M1335 1911 c-65 -40 -90 -95 -72 -161 33 -126 202 -145 262 -30 62 119 -79 260 -190 191z",
                    }),
                    path({
                        d: "M1812 1910 c-31 -19 -61 -64 -50 -75 3 -3 60 -4 126 -3 l121 3 -15 32 c-29 59 -120 81 -182 43z",
                    }),
                    path({
                        d: "M1261 1182 c-40 -21 -71 -73 -71 -117 0 -64 63 -125 130 -125 67 0 130 61 130 125 0 67 -66 135 -130 135 -14 0 -41 -8 -59 -18z",
                    }),
                ),
            ),
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
                        fontSize: "32px",
                        fontWeight: "bold",
                    },
                }, "Company Name"),
                div(
                    {
                        style: {
                            display: "flex",
                            marginTop: 10,
                            fontSize: "20px",
                            maxWidth: "600px",
                        },
                    },
                    "A short description of what the company does. This can span multiple lines and will be centered.",
                ),
                div({
                    style: {
                        marginTop: 20,
                        color: "#00b300",
                        fontSize: "20px",
                        fontWeight: "bold",
                        display: "flex",
                    },
                }, "$10 Referral Bonus"),
            ),
        ),
        div({
            style: {
                position: "absolute",
                bottom: "20px",
                right: "20px",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                display: "flex",
            },
        }, "Powered by FAR.CODES"),
    );
