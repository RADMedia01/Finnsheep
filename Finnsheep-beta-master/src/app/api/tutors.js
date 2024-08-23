import { Tutor } from "../lib/models";
import { connectToDB } from "../lib/utils";

export async function GET(req) {
    const url = new URL(req.url);
    const q = url.searchParams.get('q') || '';
    const page = parseInt(url.searchParams.get('page'), 10) || 1;
    const tutorType = url.searchParams.get('tutorType') || '';
    const city = url.searchParams.get('city') || '';

    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 8;

    try {
        await connectToDB();
        const filter = {
            $or: [
                { name: { $regex: regex } },
                { username: { $regex: regex } },
                { email: { $regex: regex } },
                { city: { $regex: regex } },
                { qualification: { $regex: regex } },
                { tutorType: { $regex: regex } },
                { 'subjects.subject': { $regex: regex } },
            ],
        };
        if (tutorType) {
            filter.tutorType = tutorType;
        }
        if (city) {
            filter.state = state;
        }
        const count = await Tutor.find(filter).count();
        const tutors = await Tutor.find(filter).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        return new Response(JSON.stringify({ count, tutors }), { status: 200 });
    } catch (err) {
        console.log("Error fetching tutors:", err);
        return new Response(JSON.stringify({ message: "Failed to fetch tutors!" }), { status: 500 });
    }
}
