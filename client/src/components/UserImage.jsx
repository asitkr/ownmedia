import { Box } from "@mui/material";
import { BASE_URL } from "utils";

const UserImage = ({ image, size = "60px" }) => {

    // const { _id, picturePath } = useSelector(state => state.user);

    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size}
                height={size}
                alt="user"
                src={`${BASE_URL}/assets/${image}`}
            />
        </Box>
    );
};

export default UserImage;