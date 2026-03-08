import "../../styles/recipe-avatar.css";

import SingleRowTitle from "../common/SingleRowTitle";

export default function RecipeAvatar({ user }: { user: string }) {
    return (
        <div id="recipe-avatar">
            <img src="/images/avatar.png" />
            <SingleRowTitle title={`Chef ${user}`} Header="h3" />
        </div>
    )
}