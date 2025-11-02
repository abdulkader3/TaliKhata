import { createSlice } from '@reduxjs/toolkit'

export const clientSlice = createSlice({
  name: 'clientData',
  initialState: {
    customers: {},  // Will store as { [containerName]: { items: [...], nextIndex: 1 } }
    suppliers: {}   // Will store as { [containerName]: { items: [...], nextIndex: 1 } }
  },
  reducers: {
    addCustomer: (state, action) => {
      const { containerName, data } = action.payload
      // Initialize container if it doesn't exist
      if (!state.customers[containerName]) {
        state.customers[containerName] = {
          items: [],
          nextIndex: 1
        }
      }

      // Add new item with container-specific index
      const container = state.customers[containerName]
      const newItem = {
        ...data,
        id: container.nextIndex,
        containerName,
        createdAt: new Date().toISOString()
      }
      
      container.items.push(newItem)
      container.nextIndex += 1
    },
    addSupplier: (state, action) => {
      const { containerName, data } = action.payload
      // Initialize container if it doesn't exist
      if (!state.suppliers[containerName]) {
        state.suppliers[containerName] = {
          items: [],
          nextIndex: 1
        }
      }

      // Add new item with container-specific index
      const container = state.suppliers[containerName]
      const newItem = {
        ...data,
        id: container.nextIndex,
        containerName,
        createdAt: new Date().toISOString()
      }
      
      container.items.push(newItem)
      container.nextIndex += 1
    },
    updateCustomer: (state, action) => {
      const { containerName, id, data } = action.payload
      const container = state.customers[containerName]
      if (container) {
        const index = container.items.findIndex(item => item.id === id)
        if (index !== -1) {
          container.items[index] = {
            ...container.items[index],
            ...data,
            updatedAt: new Date().toISOString()
          }
        }
      }
    },
    updateSupplier: (state, action) => {
      const { containerName, id, data } = action.payload
      const container = state.suppliers[containerName]
      if (container) {
        const index = container.items.findIndex(item => item.id === id)
        if (index !== -1) {
          container.items[index] = {
            ...container.items[index],
            ...data,
            updatedAt: new Date().toISOString()
          }
        }
      }
    },
    removeCustomer: (state, action) => {
      const { containerName, id } = action.payload
      const container = state.customers[containerName]
      if (container) {
        container.items = container.items.filter(item => item.id !== id)
      }
    },
    removeSupplier: (state, action) => {
      const { containerName, id } = action.payload
      const container = state.suppliers[containerName]
      if (container) {
        container.items = container.items.filter(item => item.id !== id)
      }
    }
  }
})

// Export actions
export const { 
  addCustomer, 
  addSupplier, 
  updateCustomer, 
  updateSupplier,
  removeCustomer,
  removeSupplier
} = clientSlice.actions

// Export reducer
export default clientSlice.reducer
