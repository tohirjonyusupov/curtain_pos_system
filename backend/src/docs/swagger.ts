import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Curtain POS System API",
      version: "1.0.0",
      description: "MVP endpoints: Products, Inventory, Sales",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string" },
          },
          required: ["error"],
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "integer" },
            storeId: { type: "integer" },
            sku: { type: "string", nullable: true },
            name: { type: "string" },
            category: { type: "string", nullable: true },
            unit: { type: "string", enum: ["meter", "piece"] },
            basePrice: { type: "number" },
            isActive: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        ProductCreateRequest: {
          type: "object",
          required: ["name", "unit", "basePrice"],
          properties: {
            storeId: { type: "integer", description: "Optional if passed in query." },
            sku: { type: "string", nullable: true },
            name: { type: "string" },
            category: { type: "string", nullable: true },
            unit: { type: "string", enum: ["meter", "piece"] },
            basePrice: { type: "number" },
            isActive: { type: "boolean" },
          },
        },
        ProductUpdateRequest: {
          type: "object",
          properties: {
            storeId: { type: "integer", description: "Optional if passed in query." },
            sku: { type: "string", nullable: true },
            name: { type: "string" },
            category: { type: "string", nullable: true },
            unit: { type: "string", enum: ["meter", "piece"] },
            basePrice: { type: "number" },
            isActive: { type: "boolean" },
          },
        },
        ProductResponse: {
          type: "object",
          properties: {
            data: { $ref: "#/components/schemas/Product" },
          },
          required: ["data"],
        },
        ProductListResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/Product" },
            },
          },
          required: ["data"],
        },
        InventoryItem: {
          type: "object",
          properties: {
            id: { type: "integer" },
            storeId: { type: "integer" },
            productId: { type: "integer" },
            qty: { type: "number" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        InventoryWithProduct: {
          allOf: [
            { $ref: "#/components/schemas/InventoryItem" },
            {
              type: "object",
              properties: {
                product: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    sku: { type: "string", nullable: true },
                    category: { type: "string", nullable: true },
                    unit: { type: "string", enum: ["meter", "piece"] },
                    basePrice: { type: "number" },
                    isActive: { type: "boolean" },
                  },
                },
              },
            },
          ],
        },
        InventoryListResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/InventoryWithProduct" },
            },
          },
          required: ["data"],
        },
        InventoryAdjustRequest: {
          type: "object",
          required: ["productId", "deltaQty"],
          properties: {
            storeId: { type: "integer", description: "Optional if passed in query." },
            productId: { type: "integer" },
            deltaQty: {
              type: "number",
              description: "Positive for incoming, negative for outgoing.",
            },
          },
        },
        InventoryAdjustResponse: {
          type: "object",
          properties: {
            data: {
              type: "object",
              properties: {
                type: { type: "string", enum: ["created", "updated"] },
                inventory: { $ref: "#/components/schemas/InventoryItem" },
              },
            },
          },
          required: ["data"],
        },
        SaleItemCreateRequest: {
          type: "object",
          required: ["productId", "qty", "unitPrice"],
          properties: {
            productId: { type: "integer" },
            qty: { type: "number" },
            unitPrice: { type: "number" },
          },
        },
        SaleCreateRequest: {
          type: "object",
          required: ["storeId", "cashierId", "paymentType", "items"],
          properties: {
            storeId: { type: "integer" },
            cashierId: { type: "integer" },
            paymentType: {
              type: "string",
              enum: ["cash", "card", "mixed", "credit"],
            },
            discount: { type: "number", default: 0 },
            paidAmount: { type: "number" },
            customerId: { type: "integer", nullable: true },
            note: { type: "string", nullable: true },
            items: {
              type: "array",
              items: {
                $ref: "#/components/schemas/SaleItemCreateRequest",
              },
            },
          },
        },
        SaleItem: {
          type: "object",
          properties: {
            id: { type: "integer" },
            productId: { type: "integer" },
            qty: { type: "number" },
            unitPrice: { type: "number" },
            lineTotal: { type: "number" },
          },
        },
        SaleSummary: {
          type: "object",
          properties: {
            id: { type: "integer" },
            storeId: { type: "integer" },
            cashierId: { type: "integer" },
            customerId: { type: "integer", nullable: true },
            receiptNo: { type: "string" },
            paymentType: {
              type: "string",
              enum: ["cash", "card", "mixed", "credit"],
            },
            subtotal: { type: "number" },
            discount: { type: "number" },
            total: { type: "number" },
            paidAmount: { type: "number" },
            note: { type: "string", nullable: true },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        SaleCreateResponse: {
          type: "object",
          properties: {
            data: {
              allOf: [
                { $ref: "#/components/schemas/SaleSummary" },
                {
                  type: "object",
                  properties: {
                    items: {
                      type: "array",
                      items: { $ref: "#/components/schemas/SaleItem" },
                    },
                  },
                },
              ],
            },
          },
          required: ["data"],
        },
        SaleListResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/SaleSummary" },
            },
          },
          required: ["data"],
        },
        SaleDetailResponse: {
          type: "object",
          properties: {
            data: {
              allOf: [
                { $ref: "#/components/schemas/SaleSummary" },
                {
                  type: "object",
                  properties: {
                    items: {
                      type: "array",
                      items: { $ref: "#/components/schemas/SaleItem" },
                    },
                  },
                },
              ],
            },
          },
          required: ["data"],
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
});
