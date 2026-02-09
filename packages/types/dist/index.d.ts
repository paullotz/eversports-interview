export interface Product {
	id: string;
	name: string;
	imageUrl: string;
}
export interface User {
	id: string;
	firstName: string;
	lastName: string;
	profilePictureUrl: string;
	email: string;
}
export interface Purchase {
	id: string;
	userId: string;
	productId: string;
	date: string;
	user: User;
	product: Product;
}
