using System.ComponentModel.DataAnnotations;

namespace Table.Models
{

    public class Color
    {
        public Color()
        {
          //OrderDetails = new HashSet<OrderDetail>();
          Product = new HashSet<Product>();
          ProductColors = new HashSet<ProductColor>();

        }
        [Key]
        public int Id { get; set; } // Unique identifier for the color
        public string? Name { get; set; } // Name or description of the color
        public string? HexCode { get; set; } // Hexadecimal color code (e.g., #RRGGBB)
        public byte Red { get; set; } // Red component (0-255)
        public byte Green { get; set; } // Green component (0-255)
        public byte Blue { get; set; } // Blue component (0-255)

        public virtual ICollection<Product> Product { get; set; }

    public virtual ICollection<ProductColor> ProductColors { get; set; }

    //public virtual ICollection<OrderDetail> OrderDetails { get; set; }
  }

}
