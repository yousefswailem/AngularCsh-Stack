using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Table.Models

{
    public class Store
    {
        public Store()
        {
            Product = new HashSet<Product>();
        }
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Location { get; set; }
        public virtual ICollection<Product> Product { get; set; } = null!;


    }

}
