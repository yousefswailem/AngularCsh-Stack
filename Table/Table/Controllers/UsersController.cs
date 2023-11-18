using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Table.Models;
using AngularC_.Data;
using System.IdentityModel.Tokens.Jwt;
using Table.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace AngularC_.Controllers
{
  [Route("api/users")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly DataContext _context;

    public UserController(DataContext context)
    {
      _context = context;
    }

    // GET: api/User
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
      return await _context.Users.ToListAsync();
    }

    // GET: api/User/5
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
      var user = await _context.Users.FindAsync(id);

      if (user == null)
      {
        return NotFound();
      }

      return user;
    }



    [HttpPost("login")]
    public async Task<ActionResult> Login(User loginDto)
    {
      if (loginDto == null)
      {
        return BadRequest(new { Message = "Invalid request" });
      }

      var userInDb = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginDto.Username);

      if (userInDb == null || !PasswordHasher.VerifyPassword(userInDb.Password, loginDto.Password))
      {
        return Unauthorized(new { Message = "Invalid username or password" });
      }

      loginDto.Token = JWTToken.GenerateJwtToken(loginDto);
      
        return Ok(new {
            Token = loginDto.Token,
            Message = "Success", UserId = userInDb.Id });
         }


    // POST: api/users
    [HttpPost]
    public async Task<ActionResult<User>> PostUser(User user)
    {

      bool usernameExists = await _context.Users.AnyAsync(u => u.Username == user.Username);
      if (usernameExists)
      {
        return BadRequest(new { message = "Username is already taken." });
      }

      user.Password = PasswordHasher.HashPassword(user.Password);

      var token = JWTToken.GenerateJwtToken(user);
      user.Token = token;
      
      _context.Users.Add(user);
      await _context.SaveChangesAsync();
      return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }




    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
    {
      var user = await _context.Users.FindAsync(id);
      if (user == null)
      {
        return NotFound(new { message = "User not found" });
      }

      user.Username = updatedUser.Username;
      user.Name = updatedUser.Name;
      user.Password = PasswordHasher.HashPassword(user.Password);

      _context.Users.Update(user);
      await _context.SaveChangesAsync();

      return Ok(new { message = "User updated successfully" });
    }




    // DELETE: api/User/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
      var user = await _context.Users.FindAsync(id);
      if (user == null)
      {
        return NotFound();
      }

      _context.Users.Remove(user);
      await _context.SaveChangesAsync();

      return NoContent();
    }
  }
}
