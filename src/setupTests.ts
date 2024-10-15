import '@testing-library/jest-dom'
import { afterEach, beforeAll, afterAll, beforeEach } from 'vitest';
import { server } from './mocks/server';
import { cleanup } from '@testing-library/svelte';

beforeEach(()=>{cleanup()})

afterEach(()=>{cleanup()})


// Start worker before all tests
beforeEach(() => { console.log("server listening"); server.listen() })

//  Close worker after all tests
afterEach(() => {console.log("server closing"); server.close()})

// Reset handlers after each test `important for test isolation`
afterEach(() => {console.log("server resetting handlers"); server.resetHandlers()})




