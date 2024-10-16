import { describe, it, expect } from 'vitest';
import {render,  screen} from '@testing-library/svelte'
import FileUpload from '../fileUpload.svelte';
import userEvent from '@testing-library/user-event';





describe("Sending of files", () => {

    it("should send the file", async () => {

        render(FileUpload);
        const user = userEvent.setup()
        
        const str = JSON.stringify({mock:"test"});
        const blob = new Blob([str]);
        const file = new File([blob], 'data.csv', { type: 'text/plain' });

        const uploadElement = screen.getByTestId('upload');
        await user.upload(uploadElement, file);

        const uploadButtonElement=screen.getByTestId('uploadButton');
        await user.click(uploadButtonElement)


        const test = await screen.findByText("File uploaded successfully")
        expect(test).toBeInTheDocument()

        

    })

});



describe("UploadListPage Panel component renders without errors", () => {
	
    it("should show 'Upload A File' when accessing the page", () => {

		render(FileUpload)
		const test = screen.getByText('Upload A File') 
		expect(test ).toBeInTheDocument()

	})


	
});
