import { describe, it, expect } from 'vitest';
import {render, screen, waitFor} from '@testing-library/svelte'
import List from '../list.svelte';






describe("Retrieving lists (Must upload csv file first due to Axios issues)",  () => {
    it("should render 50 pagination with file size of 500 lines with all the cards",  async () => {
        render(List);  

        const cardElements = await screen.findAllByText(/Email/i)
        const paginationButtonElements = await waitFor(()=>screen.getAllByTestId("paginationButton"))
        
        expect(cardElements.length).toEqual(500)
        expect(paginationButtonElements.length).toEqual(20)
        
    });
    

    
    
        
});


describe('sum test', () => {

	it('should render list page', ()=>{

		render(List)

		const textElement=screen.getByRole('heading', { level: 3 })
	
	
		expect(textElement.innerHTML).toBe("Page: 1")


		
	})
	
	
});