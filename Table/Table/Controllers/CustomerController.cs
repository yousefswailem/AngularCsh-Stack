using AngularC_.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Table.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace Table.Controllers
{
  [EnableCors("AllowAngularApp")]
  [Route("api/customers")]
  [Authorize]
  [ApiController]
  public class CustomerController : ControllerBase
  {
    private readonly DataContext _context;

    public CustomerController(DataContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetCustomers()
    {
      var customers = await _context.Customers.ToListAsync();
      return customers.Any() ? Ok(customers) : NotFound(new { message = "No customers found" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCustomer(int id)
    {
      var customer = await _context.Customers.FindAsync(id);
      if (customer == null)
      {
        return NotFound(new { message = "Customer not found" });
      }

      _context.Customers.Remove(customer);
      await _context.SaveChangesAsync();

      return Ok(new { message = "Customer deleted successfully" });
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateCustomer([FromBody] Customer customer)
    {
      if (customer == null)
      {
        return BadRequest(new { message = "Invalid form data" });
      }

      await _context.Customers.AddAsync(customer);
      await _context.SaveChangesAsync();

      return Ok(new { message = "Customer creation successful" });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCustomer(int id, [FromBody] Customer updatedCustomer)
    {
      var customer = await _context.Customers.FindAsync(id);
      if (customer == null)
      {
        return NotFound(new { message = "Customer not found" });
      }

      customer.FirstName = updatedCustomer.FirstName;
      customer.LastName = updatedCustomer.LastName;
      customer.Address = updatedCustomer.Address;
      customer.Phone = updatedCustomer.Phone;
      customer.Email = updatedCustomer.Email;

      _context.Customers.Update(customer);
      await _context.SaveChangesAsync();

      return Ok(new { message = "Customer updated successfully" });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCustomer(int id)
    {
      var customer = await _context.Customers.FindAsync(id);
      if (customer == null)
      {
        return NotFound(new { message = "Customer not found" });
      }

      return Ok(customer);
    }
  }
}
