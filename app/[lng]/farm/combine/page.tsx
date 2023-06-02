import { Card } from '@/ds/surfaces';
import { monsterLifeRecipes } from '@/data/farm/recipes';
import Recipes from './components/Recipes';

const FarmCombinePage = () => {
    return (
        <Card>
            <Recipes recipes={monsterLifeRecipes} />
        </Card>
    );
};

export default FarmCombinePage;
