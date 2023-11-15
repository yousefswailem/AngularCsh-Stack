using System.ComponentModel.DataAnnotations;

namespace Table.Models
{
  public class User
  {
    [Key]
    public int Id { get; set; }
    public string? Username { get; set; } = null!;
    public string? Name { get; set; } = null!;
    public string? Password { get; set; }
    public string? Token { get; set; }

  }
}
