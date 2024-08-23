import { fetchPortfolio } from '@/app/lib/data';
import UpdatePorfolioForm from '@/app/ui/dashboard/updatePortfolioForm/updatePorfolioForm';
import React from 'react'

const ProjectPortfolioPage = async({ params }) => {
    const { id } = params;
    const portfolio = await fetchPortfolio(id);

    const plainPortfolio = JSON.parse(JSON.stringify(portfolio)); // Convert to plain object
console.log(portfolio)
  return (
    <div className="lg:pt-[90px] lg:min-h-screen h-full my-4 lg:my-2 px-6 lg:px-0">
     <UpdatePorfolioForm portfolio={plainPortfolio}/>
    </div>
  )
}

export default ProjectPortfolioPage