
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react'
import { CocktailIngredients } from '../../components/cocktails/cocktail-ingredients';
import { Loading } from '../../components/shared/loading';
import { Logo } from '../../components/shared/logo';
import { uuidv4 } from '../../lib/uuid_v4';

const CreateCocktail = () => {
    interface Ingredient {
        name: string;
        amount: number;
    }

    const router = useRouter();

    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState([] as Ingredient[]);
    const [owner, setOwner] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Cocktail');
    const [glassType, setGlassType] = useState('Cocktail glass');

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [tempIngredientName, setTempIngredientName] = useState('');
    const [tempIngredientAmount, setTempIngredientAmount] = useState('');

    const addIngredient = () => {
        if (!tempIngredientAmount || !tempIngredientName)
            return;

        ingredients.push({
            name: tempIngredientName,
            amount: Number.parseFloat(tempIngredientAmount)
        });

        setIngredients(ingredients);

        setTempIngredientAmount('');
        setTempIngredientName('');
    }

    const removeIngredient = (name: string) => {
        setIngredients(ingredients.filter(p => p.name !== name));
    }

    const handleCocktail = async (e: any) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');
        setLoading(false);

        // fields check
        if (!name || !description || ingredients?.length < 1 || !category ||!glassType)
            return setError('Missing required fields');

        // post structure
        let cocktail = {
            id: uuidv4(),
            name,
            owner: !owner ? 'anonymous' : owner,
            description,
            ingredients,
            category,
            glassType,
            createdAt: new Date(),
        };

        setLoading(true);

        try {
            // save the post
            let response = await fetch('/api/cocktails/full', {
                method: 'POST',
                body: JSON.stringify(cocktail),
            });;

            // get the data
            let data = await response.json();

            if (data.success) {
                router.back();
            } else {
                // set the error
                return setError(data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (<>

        <div className="flex pb-3" style={{ backgroundSize: 'cover', backgroundPosition: 'center', flexFlow: 'column', minHeight: '60px', borderWidth: '0', borderTop: '0', borderLeft: '0', borderRight: '0' }}>
            <div className="flex justify-between">
                <Link href={'/'}>
                    <div style={{ "marginTop": "0.6rem", "marginLeft": "0.7rem" }}>
                        <Logo></Logo>
                    </div>
                </Link>
                <Link href="/">
                    <button
                        type="button"
                        className="m-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-bold text-white hover:bg-lime-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 neon-box-green"
                    >
                        Back
                    </button>
                </Link>
            </div>
        </div>
        <div className="top-title neon-box-pink">Your New Cocktail</div>
        <div className="p-4">
            <div className="lg:grid lg:grid-cols-4 md:gap-y=6 mb-14 mt-4">
                <div className="lg:col-span-1">
                </div>
                <div className="lg:col-span-2 neon-box-pink">
                    <div className="sm:px-0">
                        <div>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6 bg-black">
                                    <div className="grid grid-cols-3 gap-y-6">
                                        <div className="col-span-3 sm:col-span-3 mt-3">
                                            <label htmlFor="company-name" className="block text-sm font-medium text-white">
                                                COCKTAIL NAME*
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    name="company-name"
                                                    id="company-name"
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                                                    placeholder="The Big Splash"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-3 sm:col-span-3">
                                            <label htmlFor="about" className="block text-sm font-medium text-white">
                                                COCKTAIL DESCRIPTION*
                                            </label>
                                            <div className="mt-1">
                                                <textarea
                                                    id="application-instructions"
                                                    name="application-instructions"
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    rows={7}
                                                    className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    placeholder="e.g. A powerful cocktail with a zesty kick; perfect for those Autumn months."
                                                    defaultValue={''}
                                                />
                                            </div>
                                            <p className="text-xs text-gray-400 pt-2 pl-2 pr-2">
                                                A shorty catchy description designed to catch the eye and pull people in.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 col-span-3 sm:col-span-3">
                                            <div className="col-span-3 sm:col-span-3">
                                                <label htmlFor="position" className="block text-sm font-medium  text-white">
                                                    INGREDIENTS*
                                                </label>
                                            </div>

                                            <div className="col-span-3 sm:col-span-3 flex">
                                                <CocktailIngredients onCancel={(name: string) => removeIngredient(name)} showCancel={true} ingredients={ingredients}></CocktailIngredients>
                                            </div>
                                            <div className="col-span-3 sm:col-span-1">
                                                <div className="mt-1 flex rounded-md shadow-sm col-span-1">
                                                    <input
                                                        type="text"
                                                        name="temp-ingredient-name"
                                                        id="temp-ingredient-name"
                                                        value={tempIngredientName}
                                                        onChange={(e) => setTempIngredientName(e.target.value)}
                                                        className="focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                                                        placeholder="Ingredient Name"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-3 sm:col-span-1">
                                                <div className="mt-1 flex rounded-md shadow-sm col-span-1">
                                                    <input
                                                        type="number"
                                                        name="temp-ingredient-amount"
                                                        id="temp-ingredient-amount"
                                                        value={tempIngredientAmount}
                                                        onChange={(e) => setTempIngredientAmount(e.target.value)}
                                                        className="focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                                                        placeholder="Ingredient Amount (in parts)"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-3 sm:col-span-3">
                                                <p className="text-xs text-gray-400 pb-3 pl-2 pr-2">
                                                    Ingredients are measured in parts (e.g. 2 parts rum, 1 part orange juice, 1 part pineable juice, 0.25 parts grenadine)
                                                </p>
                                                {(!tempIngredientName || !tempIngredientAmount) ?
                                                    <button
                                                        type="button"
                                                        onClick={() => addIngredient()}
                                                        className="border-gray-500 text-black text-lg inline-flex items-center py-2 border border-transparent rounded-md shadow-sm text-xs p-3 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                                    ><span className="text-gray-500">Add Extra Ingredient</span>
                                                    </button> :
                                                    <button
                                                        type="button"
                                                        onClick={() => addIngredient()}
                                                        className="hover:bg-lime-200 neon-box-green text-white text-lg inline-flex items-center py-2 border border-transparent rounded-md shadow-sm text-xs p-3 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                                    >Add Extra Ingredient
                                                    </button>}
                                            </div>
                                        </div>

                                        <div className="col-span-3 sm:col-span-3">
                                            <label htmlFor="category" className="block text-sm font-medium text-white">
                                                TYPE OF DRINK*
                                            </label>
                                            <select
                                                id="category"
                                                name="category"
                                                onChange={(e) => setCategory(e.target.value)}
                                                autoComplete="category"
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                                            >
                                                <option>Cocktail</option>
                                                <option>Punch / Party Drink</option>
                                                <option>Shot</option>
                                                <option>Beer</option>
                                                <option>Wine</option>
                                                <option>Shake</option>
                                                <option>Soft Drink</option>
                                                <option>Coffee / Tea</option>
                                                <option>Ordinary Drink</option>
                                                <option>Other/Unknown</option>
                                            </select>
                                        </div>

                                        <div className="col-span-3 sm:col-span-3">
                                            <label htmlFor="glassType" className="block text-sm font-medium text-white">
                                                STANDARD GLASS TYPE*
                                            </label>
                                            <select
                                                id="glassType"
                                                name="glassType"
                                                onChange={(e) => setGlassType(e.target.value)}
                                                autoComplete="glassType"
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                                            >
                                                <option>Cocktail glass</option>
                                                <option>Shot glass</option>
                                                <option>Martini glass</option>
                                                <option>Beer glass</option>
                                                <option>Brandy snifter</option>
                                                <option>Pitcher</option>
                                                <option>Old-fashioned glass</option>
                                                <option>Highball glass</option>
                                                <option>Coffee mug</option>
                                                <option>Tea cup</option>
                                                <option>Other</option>
                                            </select>
                                        </div>

                                        <div className="col-span-3 sm:col-span-3">
                                            <label htmlFor="position" className="block text-sm font-medium text-white">
                                                YOUR ALIAS
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    name="position"
                                                    id="position"
                                                    onChange={(e) => setOwner(e.target.value)}
                                                    className="focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                                                    placeholder="anonymous"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-400 pt-2 pl-2 pr-2">
                                                Whatever you add here will appear as the creator under the listed cocktail. For example, if you enter 'Tom', your cocktail will say 'by Tom'. Leave it blank and your cocktail will be listed under anonymous.
                                            </p>
                                        </div>

                                        <div className="mx-auto col-span-4">
                                            {(!name || !description || ingredients?.length < 1 || !category || !glassType) &&
                                                <button
                                                    type="button"
                                                    className="border-gray-400 text-lg my-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                                    style={{ width: '100%' }}
                                                >
                                                    <span className="text-gray-500" style={{ width: '100%' }}>Create Cocktail</span>
                                                </button>}
                                            {(name && description && ingredients?.length > 0 && category && glassType) && <button
                                                type="button"
                                                className="hover:bg-lime-200 neon-box-green text-lg my-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                                style={{ width: '100%' }}
                                                onClick={handleCocktail}
                                            >
                                                {!loading && <span style={{ width: '100%' }}>Create Cocktail</span>}
                                                {loading && <Loading></Loading>}
                                            </button>}
                                            {error && <p className='text-red-500 text-center'>Your drink didn't mix properly :/ Try again?</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default CreateCocktail;