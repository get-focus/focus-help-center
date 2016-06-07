//Style

// Components
import {ArticleList} from '../../../common/components/article/list';

/** Root component of the back-office app. */
export function HomeView() {
    return (
        <div>
            <h3>Back office</h3>
            <ArticleList />
        </div>
    );
}