import React from 'react'
import App from './App'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
jest.mock('../../apiCalls.js')
import {getOrders, postNewOrder} from '../../apiCalls';

describe("App", () =>{
    let mockOrders

    beforeEach(() => {
        mockOrders = {
            orders: [
                {
                    id: 1,
                    name: "John",
                    ingredients: ["beans", "rice"]
                },
                {
                    id: 2,
                    name: "Paul",
                    ingredients: ["carnitas", "cheese"]
                },
                {
                    id: 3,
                    name: "George",
                    ingredients: ["tomatoes"]
                },
            ]
        }
        getOrders.mockResolvedValueOnce(mockOrders)
        render (<App />)
    })

    it('should have existing orders appear after App renders', async () => {
        const john = await waitFor(() => screen.getByText("John"))
        expect(john).toBeInTheDocument()
        const paul = await waitFor(() => screen.getByText("Paul"))
        expect(paul).toBeInTheDocument()
        const george = await waitFor(() => screen.getByText("George"))
        expect(george).toBeInTheDocument()
    })

    it('should be able to add an order to the existing list', async () => {
        postNewOrder.mockResolvedValueOnce(mockOrders)
        const nameInput = screen.getByPlaceholderText("Name")
        const ingredientBtns = screen.getAllByTestId("ingredient-btn")
        const submitBtn = screen.getByText("Submit Order")
        userEvent.type(nameInput, "Ringo")
        userEvent.click(ingredientBtns[0])
        userEvent.click(ingredientBtns[2])
        userEvent.click(submitBtn)
        const ringo = await waitFor(() => screen.getByText("Ringo"))
        expect(ringo).toBeInTheDocument()
    })
})