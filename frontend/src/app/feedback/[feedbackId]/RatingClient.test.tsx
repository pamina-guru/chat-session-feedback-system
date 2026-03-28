import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RatingClient from "./RatingClient";

describe("RatingClient", () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        code: "SUCCESS",
                        message: "Feedback submitted successfully.",
                    }),
            } as Response)
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("shows thank you message after successful rating submission", async () => {
        const user = userEvent.setup();

        render(
            <RatingClient
                feedbackId="fb-test-001"
                ratingLabels={["Very Bad", "Bad", "Okay", "Good", "Excellent"]}
                thankYouText="Thanks for your feedback!"
            />
        );

        const ratingButton = screen.getByRole("button", { name: /5/i });
        await user.click(ratingButton);

        expect(await screen.findByText("Thank You")).toBeInTheDocument();
        expect(
            screen.getByText("Thanks for your feedback!")
        ).toBeInTheDocument();
    });
});