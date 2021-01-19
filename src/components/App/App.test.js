import React from 'react'
import App from './App'
import { screen, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
jest.mock('../../apiCalls.js')
import {getOrders, postNewOrder} from '../../apiCalls';

describe("App", () =>{
    let nameInput
    let ingredientBtns
    let submitBtn
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
        nameInput = screen.getByPlaceholderText("Name")
        ingredientBtns = screen.getAllByTestId("ingredient-btn")
        submitBtn = screen.getByText("Submit Order")
    })

    it('should have existing reservations appear after App renders', () => {
        expect(screen.getByText("John")).toBeInTheDocument()
        expect(screen.getByText("Paul")).toBeInTheDocument()
        expect(screen.getByText("George")).toBeInTheDocument()
    })
})