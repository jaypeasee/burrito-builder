import React from 'react'
import OrderForm from './OrderForm'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

describe('OrderForm', () => {
    let nameInput
    let ingredientBtns
    let submitBtn
    let addToOrders
    beforeEach(() => {
        addToOrders = jest.fn()
        render (
            <OrderForm 
                addToOrders={addToOrders}
            />
        )
        nameInput = screen.getByPlaceholderText("Name")
        ingredientBtns = screen.getAllByTestId("ingredient-btn")
        submitBtn = screen.getByText("Submit Order")
    })

    it('should have a name input, ingredients buttons, and a submit form', () => {
        expect(nameInput).toBeInTheDocument()
        expect(ingredientBtns.length).toBe(12)
        expect(submitBtn).toBeInTheDocument()
    })

    it('should start by saying nothing is in a current order', () => {
        expect(screen.getByText("Order: Nothing selected")).toBeInTheDocument()
    })

    it('should update what the order says when the user picks ingredients in the form', () => {
        userEvent.click(ingredientBtns[0])
        userEvent.click(ingredientBtns[2])
        expect(screen.getByText("Order: beans, carnitas")).toBeInTheDocument()
    })

    it('should call addToOrders() with a complete object when the submit button is clicked', () => {
        Date.now = jest.fn().mockImplementation(() => 1)
        userEvent.type(nameInput, "JP")
        userEvent.click(ingredientBtns[0])
        userEvent.click(ingredientBtns[2])
        userEvent.click(submitBtn)
        expect(addToOrders).toBeCalledWith({
            id: 1,
            name: "JP",
            ingredients: ["beans", "carnitas"]
        })
    })

    it('should not be able to call addToOrders() without a name', () => {
        userEvent.click(ingredientBtns[0])
        userEvent.click(ingredientBtns[2])
        userEvent.click(submitBtn)
        expect(addToOrders).not.toHaveBeenCalled()
    })

    it('should not be able to call addToOrders() without any ingredients', () => {
        userEvent.type(nameInput, "JP")
        userEvent.click(submitBtn)
        expect(addToOrders).not.toHaveBeenCalled()
    })
})