import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserNavbarComponent } from "./user-navbar/user-navbar.component";
import { CommonModule } from '@angular/common';
import { UserCartComponent } from './user-cart/user-cart.component';

@Component({
    selector: 'app-user-component',
    standalone: true,
    templateUrl: './user-component.component.html',
    styleUrl: './user-component.component.css',
    imports: [RouterOutlet, UserNavbarComponent, CommonModule, UserCartComponent]
})
export class UserComponentComponent {
  items = [
      {
        img: '/Screenshot 2024-07-02 112511.png',
        title: 'Itel',
        description: 'Itel A70 6.6" HD+Water Drop Full Screen 128GB+8(3+5)GB RAM 4G',
        price: 'Ksh. 12,000'
      },
      {
        img: '/Earphones.png',
        title: 'Earphones',
        description: '2024 New Black(Metal) Wired Earphones',
        price: 'Ksh. 199'
      },
      {
        img: '/headphones.png',
        title: 'Headphones',
        description: 'The latest hot-selling P9 Pro Max TWS microphone noise-cancelling bass subwoofer fashion sports headphones',
        price: 'Ksh. 799'
      },
      {
        img: '/bt.png',
        title: 'Bluetooth transmitter',
        description: 'Bluetooth Transmitter Receiver Wireless Audio 3.5mm Aux Adapter',
        price: 'Ksh. 399'
      },
      {
        img: '/usb.png',
        title: 'USB',
        description: 'Mini Portable USB LED Book Light DC5V Ultra Bright Reading Book Lamp',
        price: 'Ksh. 239'
      },
      {
        img: '/gown.png',
        title: 'Nightgowns',
        description: '2pcs/Set Sexy lace Women Nightwear Nightgowns',
        price: 'Ksh. 799'
      },
      {
        img: '/short.png',
        title: 'Shorts',
        description: 'SXCHEN New Men\'s Shorts Casual Sports',
        price: 'Ksh. 599'
      },
      {
        img: '/biker.png',
        title: 'Pyjamas',
        description: '3 In 1 Women\'s Pyjamas Shorts 3pcs Girl\'s Gym Yoga Home Yoga Beach Shorts Lady Clothing Women\'s Breathable Comfortable Bottoms',
        price: 'Ksh. 999'
      },
      {
        img: '/tisho.png',
        title: 'T-shirt',
        description: 'New Arrival Quick drying t-shirt men\'s summer new T-shirt training loose and breathable fitness running quick drying clothes short sleeves',
        price: 'Ksh. 399'
      },
      {
        img: '/lingerie.png',
        title: 'Bra',
        description: 'Women fashion cloth lady lingerie backless adjustable bra',
        price: 'Ksh. 359'
      },
      {
        img: '/handbag1.png',
        title: 'Slingbag',
        description: '2Pcs/Set Large Size Women Handbag Lady PU Leather Shoulder Bag Ladies Handbags Sling Bags Hand Bags For Ladies Casual Soft Gift Big',
        price: 'Ksh. 599'
      },
      {
        img: '/handbag2.png',
        title: 'Tote handbag',
        description: '4pcs Ladies Bag Set Women Handbags Shoulder Tote Sling Bags PU Leather Waterproof Kings Fashion',
        price: 'Ksh. 849'
      },
      {
        img: '/handbag3.png',
        title: 'Purse',
        description: '3PCS Women Bags Handbags Ladies Bags Purse Lady Bags Set Tote Bags Hobo Bags Promotio Big Discount',
        price: 'Ksh. 1,999'
      },
      {
        img: '/handbag4.png',
        title: 'Shoulder bag',
        description: 'New Arrivals Ladies Bag Fashion Bag Women\'s Casual Trend Shoulder Bag Tote Bag Women Handbags Ladies Shoulder Bags',
        price: 'Ksh. 699'
      },
      {
        img: '/handbag5.png',
        title: 'Leather handbag',
        description: 'Women PU Leather Handbags Big Capacity Tote Bags Retro Double Strap Shoulder Bag Female Shopper bags',
        price: 'Ksh. 799'
      },
      {
        img: '/loafer.png',
        title: 'Loafers',
        description: 'Men\'s fashion loafers shoes comfortable driving shoes boy\'s non-slip cloth shoes sports shoes students flats athletic shoes breathable cloth shoes walking shoes',
        price: 'Ksh. 999'
      },
      {
        img: '/bake.png',
        title: 'Sneaker',
        description: 'ZZQLM Men\'s Shoes New Men\'s Basketball Shoes Indoor Non-Slip Training Shoes All-match Wear-resistant Outdoor Shoes Men\'s Sports Shoes Fashion Sneakers',
        price: 'Ksh. 1,549'
      },
      {
        img: '/sneaker.png',
        title: 'Air Cushion sneaker',
        description: 'Air Cushion Men Sport Running Shoes Fashion Sneakers Jogging Trainers Casual Lace-up Breathable Mesh Outdoor',
        price: 'Ksh. 1,999'
      },
      {
        img: '/women1.png',
        title: 'Sandals Heels',
        description: 'Ladies Shoes Women Shoes Sandals Heels Wedding Shoes Transparent Heels Dress Shoes Slippers Mules Clogs',
        price: 'Ksh. 1,079'
      },
      {
        img: '/women2.png',
        title: 'SXCHEN',
        description: 'SXCHEN Women\'s Shoes Boots Over-The-Knee Ladies Shoes Long Boots Women Boots New Edition Boots Show Slim Knee High Elastic Suede Boots for Women Boots For Girl Party Gift Style Boots In Black Fashion',
        price: 'Ksh. 1,199'
      }
  ];

  constructor(private Router: Router) {}

  viewItem(item: {img: string,title: string,description:string,price:string}) {
    this.Router.navigate(['/user-cart'], { queryParams: { item: JSON.stringify(item) } });
  }
}
