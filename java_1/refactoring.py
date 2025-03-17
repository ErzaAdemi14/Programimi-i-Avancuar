# def f(l, t):
#     r = []
#     for i in range(len(l)):
#         if l[i]["t"] == t:
#             r.append(l[i])
#     return r

# # Usage example:
# items = [
#     {"id": 1, "t": "book", "price": 20},
#     {"id": 2, "t": "food", "price": 10},
#     {"id": 3, "t": "book", "price": 15},
#     {"id": 4, "t": "food", "price": 5}
# ]
# books = f(items, "book")

#Refactored code
def filter_items_by_type(items, type):
    result = []
    for item in items:
        if item["type"] == type:
            result.append(item)
    return result

# Usage example:
items = [
    {"id": 1, "type": "book", "price": 20},
    {"id": 2, "type": "food", "price": 10},
    {"id": 3, "type": "book", "price": 15},
    {"id": 4, "type": "food", "price": 5}
]
books = filter_items_by_type(items, "book")
print(books) # [{"id": 1, "type": "book", "price": 20}, {"id": 3, "type": "book", "price": 15}]