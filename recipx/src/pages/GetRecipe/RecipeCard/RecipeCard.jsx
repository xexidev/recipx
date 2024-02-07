import './RecipeCard.css'

export default function RecipeCard ({ children, recipeIsReady }) {
  return (
    <div className='recipe-card'>
      { recipeIsReady && <h2 className='recipe-card-title'>Aquí está tu receta</h2> }
      {children}
    </div>
  )
}
